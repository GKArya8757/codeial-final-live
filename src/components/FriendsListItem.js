import React from 'react';
import { Link } from 'react-router-dom';

function FriendsListItem(props) {
  return (
    <div>
      <Link className="friends-item" to={`user/${props.friend._id}`}>
        <div className="friends-img">
          <img
            src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
            alt="user-pic"
          />
        </div>
        <div className="friends-name">{props.friend.email}</div>
      </Link>
    </div>
  );
}

export default FriendsListItem;
