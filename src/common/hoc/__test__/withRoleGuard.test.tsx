import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../store';
import { LOCAL_STORE } from '../../constants/keys';
import withRoleGuard from '../withRoleGuard';
import { ROLE } from '../../constants/role';

// Mocking dependencies
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('../store/slices/authSlice', () => ({
  initProfile: jest.fn(),
  selUser: jest.fn(),
}));

// Mock Component to wrap with HOC
const MockComponent = () => <div>Protected Content</div>;

describe('withRoleGuard HOC', () => {
  let mockRouter: { replace: jest.Mock };
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    mockRouter = { replace: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    mockDispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('renders the component if user is authorized', async () => {
    // Mocking the user state to represent an authorized user with the correct role
    (useAppSelector as jest.Mock).mockReturnValue({ license: ROLE.ADMIN });
    localStorage.setItem(LOCAL_STORE.ACCESS_TOKEN, 'valid_token');

    const WrappedComponent = withRoleGuard(MockComponent, [ROLE.ADMIN]);
    render(<WrappedComponent />);

    await waitFor(() => {
      expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });
  });
});
