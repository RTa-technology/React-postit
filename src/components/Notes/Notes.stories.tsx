// src/components/Notes/Notes.stories.tsx
import React from 'react';
import { action } from '@storybook/addon-actions';
import Notes from './Notes';

export default {
    title: 'Components/Notes',
    component: Notes,
};

const Template = (args) => <Notes {...args} />;

export const Default = Template.bind({});
Default.args = {
    notes: [
        {
            id: "fd7f9dd4-80b5-4479-a2f8-2c9bb67794a0",
            content: "<p>Sample content 1</p>",
        }
    ],
    onUpdate: action('Updated Note'),
    onDelete: action('Deleted Note'),
    onNew: action('New Note Created'),
};
