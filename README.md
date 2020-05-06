# Music Event Match

Find local music events based on city search

## Project Summary

This web app will allow users to search for upcoming music events in their area.

## Technical summary

Project is written in React and it will consume the following API:

- SongKick: https://www.songkick.com/developer/upcoming-events-for-metro-area

The SongKick api is accessed from an express server backend to eliminate CORS issues.

## Features

The user will be able to do the following:

- Search for upcoming music events in their metro area via a search form
- View upcoming music event in their metro area

## Milestones

1. Creation of search form component and ability to search for music events in the specified metro area.
2. Implement songkick api call searching for upcoming music events.
3. Creation of display list component, which will display upcoming music events in the specified metro area.
4. Style pages

## Installation Requirements

- NodeJS
- npm

## Requirements to run the project

In order to run the application you will need a .env file in project root with the following entry:

- REACT_APP_SKK=<SONGKICK_API_KEY>

To run, navigate to the project root and run the following: `npm install && npm run dev`
