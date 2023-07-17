# Image Processing API

This is a project for the Image Processing API in the Full Stack JavaScript Developer Nanodegree program at Udacity.

## Project Description

The Image Processing API is a Node.js application that allows users to resize and process images. It provides an API endpoint that accepts image information (filename, width, and height) and returns the resized image.

## Available Scripts

In the project directory, you can run the following scripts:

- `npm run start`: Starts the server
- `npm run test`: Compiles the TypeScript code to JavaScript and runs the unit tests
- `npm run build`: Compiles the TypeScript code to JavaScript
- `npm run prettier`: Run to reformat codes according to the pattern after codes has been changed and added to git
- `npm run lint`: Run to identify and report syntax errors, potential bugs, and code style violations

## Usage
The server will listen on port 3000:

#### Brief instructions
http://localhost:3000/

#### Endpoint to resize image
http://localhost:3000/api/image

Expected query arguments are:
- _imageFileName_: Available filenames is imageName.imageExtension
- _width_: numerical pixel value > 0
- _height_: numerical pixel value > 0

#### Example 1
http://localhost:3000/api/image?imageFileName=spiderman.png&width=500&height=500
Will scale the fjord image to 200 by 200 pixels and store the resulting image.
On subsequent calls will serve the resized image instead of resizing the
original again.

#### Example 2
http://localhost:3000/api/image?width=500&height=500
Missing image file name.

#### Example 3
http://localhost:3000/api/image?imageFileName=spiderman.png&width=-500&height=500
Invalid width parameter.

#### Example 4
http://localhost:3000/api/image?imageFileName=spiderman.png&width=500
Missing height parameter.

#### Example 5
http://localhost:3000/api/image?imageFileName=image.png&width=500&height=500
Image not exist.

## Getting Started

To get started with the Image Processing API, follow these steps:

1. Clone the repository: `git clone https://github.com/duyphuongls1999/udacity_image_processing_api.git`
2. Install the dependencies: `npm install`
3. Start the server: `npm run start`
4. Access the API endpoint: `http://localhost:3000/api/image?imageFileName={imageName.imageExtension}&width={width}&height={height}`

## Dependencies

The project uses the following dependencies:
- Express: Web framework for Node.js
- Sharp: Image processing library
- Jasmine: Testing framework
- Jasmine Console Reporter: Console reporter for Jasmine tests
- Supertest: HTTP assertion library for testing
- Husky: Used to perform automatic tasks before and after executing git commands

## Contributing

Contributions to the Image Processing API are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.
