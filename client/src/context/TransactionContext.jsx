import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";
export const TransactionContext = React.createContext();
const { ethereum } = window;

const getEthContract = () => {
	const provider = new ethers.providers.Web3Provider(ethereum);
	const signer = provider.getSigner();
	const transactionContract = new ethers.Contract(
		contractAddress,
		contractABI,
		signer
	);
	return transactionContract;
};

export const TransactionProvider = ({ children }) => {
	const [formData, setFormData] = useState({
		addressTo: "",
		amount: "",
		keyword: "",
		message: "",
	});
	const [connectedAccount, setConnectedAcount] = useState("");

	const [isLoading, setisLoading] = useState(false);
	const [transactionCount, settransactionCount] = useState(
		localStorage.getItem("transactionCount")
	);
	const [transactions, setTransactions] = useState([]);

	const handleChange = (e, name) => {
		setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
	};

	const getAllTransactions = async () => {
		try {
			if (!ethereum) return alert("Please install metamask");
			const transactionContract = getEthContract();
			const availableTransactions =
				await transactionContract.getAllTransactions();
			const structuredTransactions = availableTransactions.map(
				(transaction) => ({
					addressTo: transaction.receiver,
					addressFrom: transaction.sender,
					timestamp: new Date(
						transaction.timestamp.toNumber() * 1000
					).toLocaleString(),
					message: transaction.message,
					keyword: transaction.keyword,
					amount: parseInt(transaction.amount._hex) / (10 ** 18),
				})
			);
			console.log(structuredTransactions);
			setTransactions(structuredTransactions);
		} catch (error) {
			console.log(error);
		}
	};

	const checkIfWalletIsConnected = async () => {
		try {
			if (!ethereum) return alert("Please install metamask");
			const accounts = await ethereum.request({ method: "eth_accounts" });
			if (accounts.length) {
				setConnectedAcount(accounts[0]);
				getAllTransactions();
			} else {
				console.log("no accounts found shawty");
			}
		} catch (err) {
			console.error(err);
		}
	};

	const checkIfTransactionsExist = async () => {
		try {
			const transactionContract = getEthContract();
			const transactionCount =
				await transactionContract.getTransactionCount();

			window.localStorage.setItem("transactionCount", transactionCount);
		} catch (error) {
			console.error(error);
			throw new Error("No ethereum object.");
		}
	};

	const connectWallet = async () => {
		try {
			if (!ethereum) return alert("Please install metamask");
			const accounts = await ethereum.request({
				method: "eth_requestAccounts",
			});
			setConnectedAcount(accounts[0]);
		} catch (err) {
			console.error(err);
			throw new Error("No ethereum object.");
		}
	};

	const sendTransaction = async () => {
		try {
			if (!ethereum) return alert("Please install metamask");
			const { addressTo, amount, keyword, message } = formData;
			const transactionContract = getEthContract();
			const parsedAmount = ethers.utils.parseEther(amount);
			await ethereum.request({
				method: "eth_sendTransaction",
				params: [
					{
						from: connectedAccount,
						to: addressTo,
						gas: "0x5208",
						value: parsedAmount._hex,
					},
				],
			});

			const transactionHash = await transactionContract.addToBlockchain(
				addressTo,
				parsedAmount,
				message,
				keyword
			);

			setisLoading(true);
			console.log(`Loading - ${transactionHash.hash}`);
			await transactionHash.wait();
			setisLoading(false);
			console.log(`Success - ${transactionHash.hash}`);

			const transactionCount =
				await transactionContract.getTransactionCount();

			settransactionCount(transactionCount.toNumber());
			window.reload();
		} catch (error) {
			console.error(error);

			throw new Error("No ethereum object");
		}
	};

	useEffect(() => {
		checkIfWalletIsConnected();
		checkIfTransactionsExist();
	}, []);

	return (
		<TransactionContext.Provider
			value={{
				connectWallet,
				connectedAccount,
				formData,
				setFormData,
				handleChange,
				sendTransaction,
				transactions,
				isLoading,
			}}
		>
			{children}
		</TransactionContext.Provider>
	);
};
