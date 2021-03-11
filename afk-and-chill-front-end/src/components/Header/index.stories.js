import React from 'react';
import Header from '../Header';

export default {
    title: 'Header',
    component: Header,
};

export const withAuth = () => <Header isAuthenticated></Header>;
export const withoutAuth = () => <Header></Header>;
