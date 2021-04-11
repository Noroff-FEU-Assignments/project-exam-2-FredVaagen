import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { BASE_URL } from './../constants/api';

export default function Home ({establishments}) {

  const getEstablishmentName = name => {
    JSON.stringify(establishments, (val) => {
      if (val === name) {
      }
      return val;
    });
  };

  const goToEstablishment = async (e, val) => {
    
    await getEstablishmentName();
    Router.push(`/establishments/${val}`);
  };

  return (
    <div className="home">
        <div className="searchbar">
            <Autocomplete className="autocomplete"
              options={establishments.map(option => option.name)}
              onChange={goToEstablishment}
              renderInput={params => (
                <TextField 
                  {...params}
                  placeholder='Search Establishments...'
                  margin='none'
                  
                  
                  
                  InputProps={{
                    ...params.InputProps,
    

                    startAdornment: (
                      <InputAdornment 
                        position='start'
                      >
                        <SearchIcon />
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />
        </div>
        <style jsx>
        {`
          .home {
            height:100vh;
            background: url('/me.jpg') no-repeat;
            background-position: center;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-content: center;
            
          }

          h1 {
            color: white;
            font-size: 1REM;
            text-align: center;
          }

          h2 {
            color: white;
            font-size: 1REM; 
            text-align: center;
          }
          .searchbar {
            background: white;
            border-radius: 20px;
            border: none;  
            align-self: center;
            width: 50%;
            max-width: 600px;
            min-width: 200px;
            padding: 1rem;

          }


        `}
      </style>
      </div>
   
       

        
  );
};

export async function getStaticProps() {

	const res = await fetch(`${BASE_URL}/establishments?_sort=name:asc`);
	const establishments = await res.json();

	return {
	  props: { establishments },
	};
  }



