import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaBookmark, FaSearch, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const mockUsers = {
  john_doe: {
    id: '1',
    username: 'john_doe',
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  jane_smith: {
    id: '2',
    username: 'jane_smith',
    name: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
};

const Navbar = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const searchPanelRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 1000);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarWidth = isSearching ? '80px' : isCollapsed ? '80px' : '220px';

  const startSearch = () => setIsSearching(true);
  const stopSearch = () => {
    setIsSearching(false);
    setSearchQuery('');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchPanelRef.current && !searchPanelRef.current.contains(e.target)) {
        stopSearch();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    stopSearch();
  }, [location]);

  const isActive = (path) => location.pathname === path;

  const navItemClass = (path) =>
    `text-light d-flex align-items-center justify-content-start px-3 py-2 rounded transition w-200 ${isActive(path) ? 'bg-success text-dark fw-bold' : ''}`;

  const results = Object.values(mockUsers).filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Sidebar */}
      <motion.div
        animate={{ width: sidebarWidth, x: 0 }}
        initial={false}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          height: 'calc(100vh - 40px)',
          backgroundColor: '#121212',
          color: 'white',
          padding: '1rem',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden',
          borderRight: '2px solid #1ED760',
          borderLeft: '2px solid #1ED760',
          borderRadius: '20px',
        }}
      >
        {/* Logo */}
        <div className="mb-4 d-flex justify-content-center">
          <div className="d-flex align-items-center overflow-hidden">
            <span style={{ fontSize: '1.5rem' }}>🎵</span>
            <motion.span
              initial={false}
              animate={{
                opacity: isCollapsed || isSearching ? 0 : 1,
                x: isCollapsed || isSearching ? -20 : 0,
              }}
              transition={{ duration: 0.3 }}
              style={{ marginLeft: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden' }}
            >
              MusicApp
            </motion.span>
          </div>
        </div>

        {/* Nav Links */}
        <div
          className="flex-grow-1 d-flex flex-column align-items-center justify-content-center"
          style={{ gap: '1.5rem', width: '100%' }}
        >
          <Link className={navItemClass('/')} to="/">
            <FaHome className="me-2" style={{ color: '#1ED760' }} />
            {!isSearching && !isCollapsed && 'Home'}
          </Link>

          <Link className={navItemClass('/profile')} to="/profile">
            <FaUser className="me-2" style={{ color: '#1ED760' }} />
            {!isSearching && !isCollapsed && 'Profile'}
          </Link>

          <Link className={navItemClass('/bookmarks')} to="/bookmarks">
            <FaBookmark className="me-2" style={{ color: '#1ED760' }} />
            {!isSearching && !isCollapsed && 'Bookmarks'}
          </Link>

          <div
            className={`text-light d-flex align-items-center justify-content-start px-3 py-2 w-200 rounded transition`}
            onClick={startSearch}
            style={{ cursor: 'pointer' }}
          >
            <FaSearch className="me-2" style={{ color: '#1ED760' }} />
            {!isSearching && !isCollapsed && 'Search'}
          </div>
        </div>

        <div style={{ height: '50px' }}></div>
      </motion.div>

      {/* Search Panel */}
      <AnimatePresence>
        {isSearching && (
          <motion.div
            ref={searchPanelRef}
            key="search-panel"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -30, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: '20px',
              left: '110px',
              height: 'calc(100vh - 40px)',
              width: '320px',
              backgroundColor: '#121212',
              padding: '1rem',
              borderRadius: '20px',
              border: '1px solid #333',
              zIndex: 999,
              boxShadow: '0 12px 30px rgba(0,0,0,0.8)',
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="text-light m-0">Search</h5>
              <button className="btn btn-sm btn-outline-light" onClick={stopSearch}>
                <FaTimes />
              </button>
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users or songs..."
              className="form-control mb-3"
              style={{
                backgroundColor: '#2a2a2a',
                border: 'none',
                color: 'white',
              }}
            />

            <div className="text-light">
              {searchQuery && results.length === 0 && <div>No users found.</div>}

              {results.map((user) => (
                <div
                  key={user.id}
                  className="d-flex align-items-center mb-2 p-2 rounded"
                  style={{ cursor: 'pointer', backgroundColor: '#1e1e1e' }}
                  onClick={() => {
                    navigate(`/${user.username}`);
                    stopSearch();
                  }}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="rounded-circle me-2"
                    style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                  />
                  <span>{user.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
