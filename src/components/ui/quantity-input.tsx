import { Minus, Plus } from '@components/icons';
import { IconButton } from '@components/ui';
import { Box } from '@material-ui/core';
import React from 'react';
import { useCounter, useUpdateEffect } from 'react-use';

type Props = {
  disabled?: boolean;
  max?: number;
  min?: number;
  onChange: (value: number) => void;
  value: number | null | undefined;
};

const QuantityInput: React.VFC<Props> = ({
  disabled,
  max = Infinity,
  min = 0,
  onChange,
  value: initialValue,
}) => {
  const [value, { inc, dec }] = useCounter(initialValue ?? 0, max, min);

  useUpdateEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
      <IconButton
        aria-label="Minus"
        size="small"
        disabled={disabled || value === min}
        onClick={() => dec()}
      >
        <Minus fontSize="inherit" />
      </IconButton>
      <Box sx={{ mx: 1 }}>{value}</Box>
      <IconButton
        aria-label="Plus"
        size="small"
        disabled={disabled || value === max}
        onClick={() => inc()}
      >
        <Plus fontSize="inherit" />
      </IconButton>
    </Box>
  );
};

export default QuantityInput;
