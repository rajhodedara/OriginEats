import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BillingInformationForm = () => {
  const [billingInfo, setBillingInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [errors, setErrors] = useState({});

  const indianStates = [
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'tamil-nadu', label: 'Tamil Nadu' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'west-bengal', label: 'West Bengal' },
    { value: 'telangana', label: 'Telangana' },
    { value: 'uttar-pradesh', label: 'Uttar Pradesh' },
    { value: 'punjab', label: 'Punjab' }
  ];

  const handleChange = (field, value) => {
    setBillingInfo(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validatePincode = (value) => {
    const pincodePattern = /^[1-9][0-9]{5}$/;
    return pincodePattern?.test(value);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          type="text"
          placeholder="Rajesh Kumar"
          value={billingInfo?.name}
          onChange={(e) => handleChange('name', e?.target?.value)}
          error={errors?.name}
          required
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="rajesh@example.com"
          value={billingInfo?.email}
          onChange={(e) => handleChange('email', e?.target?.value)}
          error={errors?.email}
          required
        />
      </div>
      <Input
        label="Phone Number"
        type="tel"
        placeholder="+91 98765 43210"
        value={billingInfo?.phone}
        onChange={(e) => handleChange('phone', e?.target?.value)}
        error={errors?.phone}
        required
      />
      <Input
        label="Address"
        type="text"
        placeholder="Flat/House No., Building Name, Street"
        value={billingInfo?.address}
        onChange={(e) => handleChange('address', e?.target?.value)}
        error={errors?.address}
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="City"
          type="text"
          placeholder="Mumbai"
          value={billingInfo?.city}
          onChange={(e) => handleChange('city', e?.target?.value)}
          error={errors?.city}
          required
        />

        <Select
          label="State"
          placeholder="Select state"
          options={indianStates}
          value={billingInfo?.state}
          onChange={(value) => handleChange('state', value)}
          error={errors?.state}
          required
        />

        <Input
          label="PIN Code"
          type="text"
          placeholder="400001"
          value={billingInfo?.pincode}
          onChange={(e) => handleChange('pincode', e?.target?.value)}
          error={errors?.pincode}
          required
          maxLength={6}
        />
      </div>
    </div>
  );
};

export default BillingInformationForm;