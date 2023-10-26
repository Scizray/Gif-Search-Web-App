//imported all the required libraries
import React, { useEffect, useState } from 'react';

import styled, { ThemeProvider } from 'styled-components';
import Login from './login';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

//Theme for Main Gif Search Page
const theme = {
  primaryColor: '#4CAF50',
  textColor: '#333',
  backgroundColor: '#FFE1CF',
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;

const SearchInput = styled.input`
  padding: 10px;
  border: none;
  border-radius: 10px;
  margin-right: 3px;
`;

const SearchButton = styled.button`
  background-color: ${(props) => props.theme.primaryColor};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const GifContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  margin: 20px 0;
`;

const GifItem = styled.img`
  max-width: calc(33.33% - 20px);
  margin-bottom: 20px;
`;

const LoadingSpinner = styled.div`
  border: 6px solid #f3f3f3;
  border-top: 6px solid ${(props) => props.theme.primaryColor};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
  margin: 50px auto;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageNumber = styled.button`
  background-color: ${(props) => (props.active ? props.theme.primaryColor : 'transparent')};
  color: ${(props) => (props.active ? 'white' : props.theme.primaryColor)};
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 5px;
`;



//Gallery Search Function

const GiphyGallery = () => {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState(null); // Declare the user state variable

  const auth = getAuth();

 // Listen for authentication state changes
 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  // Unsubscribe when the component unmounts
  return () => unsubscribe();
}, [auth]);

   // State for user authentication

  const fetchGifs = async () => {
    setLoading(true);
    try {
      const offset = (currentPage - 1) * 25;
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${process.env.GIPHY_API_KEY}&offset=${offset}`
      );
      if (response.ok) {
        const data = await response.json();
        setGifs(data.data);
      }
    } catch (error) {
      console.error('Error fetching GIFs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchGifs();
    }
  }, [searchTerm, currentPage]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(gifs.length / 25);

  return (
    user ? (
      <ThemeProvider theme={theme}>
        <PageContainer>
          <h1>GIF Gallery</h1>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Search for GIFs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchButton onClick={() => setCurrentPage(1)}>Search</SearchButton>
          </SearchContainer>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div>
              <GifContainer>
                {gifs.slice((currentPage - 1) * 25, currentPage * 25).map((gif) => (
                  <GifItem key={gif.id} src={gif.images.fixed_height.url} alt={gif.title} />
                ))}
              </GifContainer>
              <Pagination>
                {Array.from({ length: totalPages }, (_, index) => (
                  <PageNumber
                    key={index}
                    active={currentPage === index + 1}
                    onClick={() => handlePageClick(index + 1)}
                  >
                    {index + 1}
                  </PageNumber>
                ))}
              </Pagination>
            </div>
          )}
        </PageContainer>
      </ThemeProvider>
    ) : (
      <Login />
    )
  );
  

  
};


export default GiphyGallery;
