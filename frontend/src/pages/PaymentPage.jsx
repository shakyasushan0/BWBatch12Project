import { useEffect, useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import { Form, Button, Col } from "react-bootstrap";
import { savePaymentMethod } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

function PaymentPage() {
  const { paymentMethod, shippingAddress } = useSelector((state) => state.cart);
  const [payment, setPayment] = useState(paymentMethod || "cod");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress]);

  const savePaymentMethodHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(payment));
    navigate("/order");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h2>Payment Method</h2>
      <Form onSubmit={savePaymentMethodHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              className="my-2"
              type="radio"
              label="Cash on Delivery"
              id="cod"
              name="payment method"
              value="cod"
              checked={payment == "cod"}
              onChange={(e) => setPayment(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Check
              className="my-2"
              type="radio"
              label="E-Sewa"
              id="esewa"
              name="payment method"
              value="esewa"
              checked={payment == "esewa"}
              onChange={(e) => setPayment(e.target.value)}
            />
          </Col>
          <Button type="submit" variant="dark" className="my-2">
            Continue
          </Button>
        </Form.Group>
      </Form>
    </FormContainer>
  );
}

export default PaymentPage;
