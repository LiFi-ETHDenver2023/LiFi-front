import { ethers } from 'ethers';

export const signAndTransaction = async (transaction?: any) => {
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();
    console.log(signer);
    const address = signer.getAddress();
    console.log(address);

    const signedTx = await signer.sendTransaction(transaction);
    console.log(signedTx);

    return signedTx;
  }
};

export const deposit = async () => {
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_RESOURCE_ADDRESS;
    const abi: any = [
      {
        inputs: [],
        name: 'deposit',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
    ];
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const tx = await contract.deposit({
      value: ethers.utils.parseEther('0.0015'),
      gasLimit: 1000000,
      gasPrice: 1000000000,
    });
    console.log(tx);

    // const receipt = await tx.wait();
    // console.log(receipt);

    return tx;
  }
};

export const incrementCheckpoint = async () => {
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_RESOURCE_ADDRESS;
    const abi: any = [
      {
        inputs: [],
        name: 'incrementCheckpoint',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ];
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const tx = await contract.incrementCheckpoint({
      gasLimit: 1000000,
      gasPrice: 1000000000,
    });
    console.log(tx);

    return tx;
  }
};

export const withraw = async () => {
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_RESOURCE_ADDRESS;
    const abi: any = [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'withdraw',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ];
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const tx = await contract.withdraw(ethers.utils.parseEther('0.002'));
    console.log(tx);

    return tx;
  }
};
