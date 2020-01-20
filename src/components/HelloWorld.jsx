import React from 'react';

const HelloWorld = () => (
  <div className="container">
    <div className="row">
      <div className="col">
        <h1>Hey</h1>
      </div>
      <div className="col text-right">
        <h1>IT WORKS</h1>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <div className="alert alert-success" role='alert'>
          Hello World
        </div>
      </div>
    </div>
  </div>
);

export default HelloWorld;
