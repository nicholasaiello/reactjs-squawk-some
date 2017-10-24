import React from 'react';

const AppFooter = () => {

  const year = (new Date()).getFullYear();

  return (
    <footer>
      <p>
        <small>&copy; copyright nicholas aiello {year}. all rights reserved.</small>
      </p>
    </footer>
  );

};

export default AppFooter;
