export const connectMetamask = async () => {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      alert('Get MetaMask!');

      return;
    }
    const accounts = (await ethereum.request({ method: 'eth_requestAccounts' })) as Array<string>;

    console.log('Connected metamask', accounts[0]);

    return accounts[0];
  } catch (error) {
    console.log(error);
  }
};
