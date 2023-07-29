// src/components/Notes/Notes.tsx
import React, { useState, useEffect } from 'react';

import { Editor } from 'react-draft-wysiwyg';

import { Rnd } from 'react-rnd';
import { v4 as uuidv4 } from 'uuid';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import 'react-quill/dist/quill.snow.css'; // import styles
import './Notes.css'; // Assuming you have a CSS file for styles

export function DraggableResizableNote({ id, content, onUpdate, onDelete }) {
    const [noteContent, setNoteContent] = useState(content || '');

    const handleContentChange = value => {
        setNoteContent(value);
    };

    const handleUpdateClick = () => {
        onUpdate(id, noteContent);
    };

    return (
        <Rnd
            default={{
                x: 0,
                y: 0,
                width: 400,
                height: 200,
            }}
            enableResizing={{
                top: true, right: true, bottom: true, left: true,
                topRight: true, bottomRight: true, bottomLeft: true, topLeft: true,
            }}
            dragHandleClassName="note-header"
        >
            <div className="note">
                <div className="note-header">
                    <button className="delete-button" onClick={() => onDelete(id)}>Delete</button>
                </div>
                <div className="note-content">
                    <Editor
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class"
                        toolbarClassName="toolbar-class"
                        toolbar={{
                            options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'history'],
                            inline: { inDropdown: true },
                            list: { inDropdown: true },
                            textAlign: { inDropdown: true },
                            link: { inDropdown: true },
                            history: { inDropdown: true },
                            blockType: { options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'], },
                        }}
                        localization={{
                            locale: 'ja',
                        }}
                    />
                </div>
                <div className="note-footer">
                    <button onClick={handleUpdateClick}>Update</button>
                </div>
            </div>
        </Rnd>
    );
}


function Notes({ notes = [], onUpdate, onDelete, onNew }) {
    const [localNotes, setNotes] = useState(notes);

    useEffect(() => {
        setNotes(notes);
    }, [notes]);

    const handleUpdate = (id, content) => {
        const newNotes = localNotes.map(note =>
            note.id === id ? { ...note, content } : note
        );
        setNotes(newNotes);
        if (onUpdate) {
            onUpdate(id, content);
        }
    };

    const handleDelete = id => {
        const newNotes = localNotes.filter(note => note.id !== id);
        setNotes(newNotes);
        if (onDelete) {
            onDelete(id);
        }
    };

    const handleNewNote = () => {
        const newNote = { id: uuidv4(), content: '' };
        setNotes([...localNotes, newNote]);
        if (onNew) {
            onNew(newNote);
        }
    };

    return (
        <div>
            <button onClick={handleNewNote}>New note</button>
            {localNotes.map(note => (
                <DraggableResizableNote
                    key={note.id}
                    id={note.id}
                    content={note.content}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
}

export default Notes;
