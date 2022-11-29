import React, { useEffect, useState } from 'react';

// Comments left by users using the form on Connect Page displays here
function Comments() {
  // Hook
  const [comments, setComments] = useState(``);
  let comment_holder = '';

  // Get data from /comments to display on the page
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      data.forEach((commenter) => {
        comment_holder =
          comment_holder + `\n${commenter.name} says ${commenter.comments} `;
      });
      setComments(comments + comment_holder);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const url = 'http://localhost:8080/comments';
    fetchData(url);
  }, []);

  return (
    <div className="container mx-auto my-auto text-center">
      <div>
        <pre>{`${comments}`}</pre>
      </div>
    </div>
  );
}

export default Comments;
