import { Price } from '@components/core';
import { Typography } from '@material-ui/core';
import React from 'react';
import { CartQuery } from '../../graphql';

type Props = {
  availableShippingMethods: NonNullable<CartQuery['cart']>['availableShippingMethods'];
  chosenShippingMethod: NonNullable<CartQuery['cart']>['chosenShippingMethod'];
};

const ShippingSummary: React.VFC<Props> = ({ availableShippingMethods, chosenShippingMethod }) => {
  const shippingMethod = availableShippingMethods?.[0]?.rates?.find(
    (rate) => rate?.id === chosenShippingMethod,
  );

  return (
    <Typography gutterBottom>
      {`${shippingMethod?.label} | `}
      <Price component="span">{shippingMethod?.cost}</Price>
    </Typography>
  );
};

export default ShippingSummary;
