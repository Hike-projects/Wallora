import React, { useState } from 'react';
import './Home.css';

const initialWallpapers = [
  { name: 'Forest Trail', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', category: 'Nature', likes: 0, downloads: 0, liked: false },
  { name: 'Moody Forest', url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368', category: 'Nature', likes: 0, downloads: 0, liked: false },
  { name: 'Sunset Mountains', url: 'https://images.unsplash.com/photo-1549887534-7091c7c54e5e', category: 'Nature', likes: 0, downloads: 0, liked: false },
  { name: 'City at Night', url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', category: 'City', likes: 0, downloads: 0, liked: false },
  { name: 'Waterfall in Forest', url: 'https://images.unsplash.com/photo-1587502536263-9298cfdc399b', category: 'Nature', likes: 0, downloads: 0, liked: false },
  { name: 'Northern Lights', url: 'https://images.unsplash.com/photo-1508614589041-895b88991e7d', category: 'Space', likes: 0, downloads: 0, liked: false }
];

const Home = () => {
  const [data, setData] = useState(initialWallpapers);
  const [searchText, setSearchText] = useState('');

  const toggleLike = (index) => {
    const newData = [...data];
    newData[index].liked = !newData[index].liked;
    newData[index].likes += newData[index].liked ? 1 : -1;
    setData(newData);
  };

  const handleDownload = (url, index) => {
    const newData = [...data];
    newData[index].downloads += 1;
    setData(newData);
    window.open(url, '_blank');
  };

  const filteredWallpapers = data.filter(w =>
    w.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="home-container">
      <h1>Wallpapers</h1>

      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          className="search-input"
          type="text"
          placeholder="Search wallpapers..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="wallpaper-grid">
        {filteredWallpapers.map((wallpaper, index) => (
          <div key={index} className="wallpaper-item">
            <img src={`${wallpaper.url}?auto=compress&cs=tinysrgb&h=800`} alt={wallpaper.name} />
            <div className="wallpaper-info">
              <p>{wallpaper.name}</p>
              <p className="wallpaper-category">{wallpaper.category}</p>
              <div className="wallpaper-buttons">
                <button onClick={() => handleDownload(wallpaper.url, index)}>📥 {wallpaper.downloads}</button>
                <button onClick={() => toggleLike(index)}>{wallpaper.liked ? '❤️' : '🤍'} {wallpaper.likes}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;