# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React application for generating French employment contract amendments (avenants CDI). The application provides a two-step form interface for collecting contract data and generates professional DOCX documents.

## Development Commands

- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm install` - Install dependencies after adding new packages

## Architecture

### Core Application Flow
1. **Form Input** - Two-step form collecting employer and employee data
2. **Live Preview** - Real-time document preview rendered as HTML
3. **DOCX Generation** - Professional Word document creation using the `docx` library

### Key Files and Responsibilities

- **`src/App.jsx`** - Main application component containing form state management, step navigation, and the complete UI layout
- **`src/amendmentTemplates.js`** - Contract text templates for different amendment types (salary, position, work time, location changes)
- **`src/docxGenerator.js`** - DOCX document generation logic using the `docx` library with proper legal formatting
- **`src/index.css`** - Global styles with SF Pro Display font configuration

### State Management
The application uses React useState for form data management with a centralized `formData` object containing all contract fields. Dynamic text replacement occurs when users select different amendment types from the dropdown.

### Template System
Amendment templates are stored as template literals with placeholder text in French legal format. The system automatically updates the form's amendment content when users select different contract modification types.

### Document Generation
Uses the `docx` library to create professionally formatted Word documents with:
- Proper legal document structure
- Bold/italic formatting for emphasis
- Centered titles and proper spacing
- Signature blocks and legal disclaimers

## Technology Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with SF Pro Display font
- **Icons**: Lucide React
- **Document Generation**: docx library
- **Build Tool**: Vite with React plugin

## Key Dependencies

- `docx` - Word document generation (version ^8.5.0)
- `lucide-react` - Icon library for UI elements
- `tailwindcss` - Utility-first CSS framework

## Development Notes

The application targets French employment law and generates legally compliant contract amendments. All text templates and UI copy are in French. The form validation is primarily client-side with required field indicators in the UI.