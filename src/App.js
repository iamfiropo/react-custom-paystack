import React from "react";

import PaymentPage from "./pages/payment/payment.component";

const App = () => {
  const callback = reference => {
    console.log(reference)
    /**
     * Here you can make a post request to your backend to verify the transaction
     * with the ${reference} argument returned
     */
  }

  return (
    <div>
    <PaymentPage 
      amount={1000}
      email='prince@yahoo.com'
      publicKey='pk_test_2b84a418e85afec7e189b4e9d5fa08e4373f6313'
      callback={callback}
    />
  {/*<PaymentPage />*/}
    </div>
  );
};

export default App;
