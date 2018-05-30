import React from 'react';
import styles from './Library.css';

class Book extends React.Component {
  render() {
    let {title, author} = this.props.book;
    return (
      <div className="container">
        <div className="book">
          <div className='front'>
            <div className='cover'>
              <h2>
                <span>{author}</span>
                <span>{title}</span>
              </h2>
            </div>
          </div>

          <div className='left'>
            <h2>
              <span>{author}</span>
              <span>{title}</span>
            </h2>
          </div>
        </div>

      </div>
    )
  }
}

export default Book;