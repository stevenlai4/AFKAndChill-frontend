import React from 'react';
import { actions } from '@storybook/addon-actions';

import Profile from './index';

const ProfileForm = {
    title: 'Profile',
    component: Profile,
};

export const Default = () => <Profile></Profile>;

export default ProfileForm;
