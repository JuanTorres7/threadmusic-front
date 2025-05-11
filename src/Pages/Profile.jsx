import React from 'react';
import { useParams } from 'react-router-dom';
import Post from '../components/Post';

const mockUsers = {
  john_doe: {
    id: '1',
    username: 'john_doe',
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=1',
    followers: 128,
    following: 87,
    posts: [
      { id: 'p1', userId: '1', content: 'My first song!', song: 'song1.mp3', comments: [] },
      { id: 'p2', userId: '1', content: 'Loving this track!', song: 'song2.mp3', comments: [] },
    ],
  },
  jane_smith: {
    id: '2',
    username: 'jane_smith',
    name: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/150?img=2',
    followers: 240,
    following: 103,
    posts: [
      { id: 'p3', userId: '2', content: 'Check this out!', song: 'song3.mp3', comments: [] },
    ],
  },
};

const Profile = () => {
  const { username } = useParams();
  const user = mockUsers[username];

  if (!user) {
    return <div className="text-light p-4">Usuario no encontrado</div>;
  }

  return (
    <div className="text-light p-4">
      {/* Header */}
      <div className="d-flex align-items-center mb-4">
        <img
          src={user.avatar}
          alt={user.name}
          className="rounded-circle me-3"
          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
        />
        <div>
          <h4 className="mb-1">{user.name}</h4>
          <div className="text-white small">
            @{user.username} • {user.followers} Followers • {user.following} Following • {user.posts.length} Posts
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="d-flex flex-column gap-3">
        {user.posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
