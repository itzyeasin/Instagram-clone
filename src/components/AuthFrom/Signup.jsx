import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertIcon,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useState } from 'react';
import useSignUpWithEmailAndPassword from '../../hooks/useSignUpWithEmailAndPassword';

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error, signup } = useSignUpWithEmailAndPassword();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Validate username length
    if (name === 'username') {
      if (value.length > 20) {
        return; // Prevent updating state if username exceeds 20 characters
      }
      setInputs((prev) => ({ ...prev, [name]: value.toLowerCase() })); // Convert to lowercase for username
    } else {
      setInputs((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      signup(inputs);
    }
  };

  return (
    <>
      <Input
        placeholder="Email"
        fontSize={14}
        type="email"
        size={'sm'}
        name="email"
        value={inputs.email}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <Input
        placeholder="Username"
        fontSize={14}
        type="text"
        size={'sm'}
        name="username"
        value={inputs.username}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <Input
        placeholder="Full Name"
        fontSize={14}
        type="text"
        size={'sm'}
        name="fullName"
        value={inputs.fullName}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <InputGroup>
        <Input
          placeholder="Password"
          fontSize={14}
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={inputs.password}
          size={'sm'}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <InputRightElement h="full">
          <Button
            variant={'ghost'}
            size={'sm'}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>

      {error && (
        <Alert status="error" fontSize={13} p={2} borderRadius={4}>
          <AlertIcon fontSize={12} />
          {error.message}
        </Alert>
      )}

      <Button
        w={'full'}
        colorScheme="blue"
        size={'sm'}
        fontSize={14}
        isLoading={loading}
        onClick={() => signup(inputs)}
        onKeyDown={handleKeyDown} // Ensure button press also triggers signup on Enter key
      >
        Sign Up
      </Button>
    </>
  );
};

export default Signup;
