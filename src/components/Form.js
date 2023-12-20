import React, { useState, Fragment } from 'react';

const Form = ({ fields, onSubmit, submitLabel }) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {fields.map(field => (
          <Fragment key={field.name}>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
            />
          </Fragment>
        ))}
        <button type="submit">{submitLabel}</button>
      </form>
    </>
  );
};

export default Form;
