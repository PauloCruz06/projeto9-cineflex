import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Footer from "./Footer";
import Seat from "./Seat";

import styled from "styled-components";

export default function Seats(){
    const { id } = useParams();
    const[session, setSession] = useState({});
    const[seats, setSeats] = useState ([]);
    
    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${id}/seats`);
        promise.then((re) => {
            console.log(re.data);
            setSession(re.data);
            setSeats(re.data.seats);
        });
    }, []);

    if(seats.length > 0){
        return(
            <>
                <SeaTs>
                    <p>Selecione o(s) assentos(s)</p>
                    <div className="seatsbox">
                        {seats.map((seat) => (
                            <Seat name={seat.name} isAvailable={seat.isAvailable} />
                        ))}
                    </div>
                </SeaTs>
                <Footer>
                    <div className="movie">
                        <img alt={session.movie.title} src={session.movie.posterURL} />
                    </div>
                    <p>
                        <p>{session.movie.title}</p>
                        <p>{session.day.weekday} - {session.name}</p>
                    </p>
                </Footer>
            </>
        );
    }else{
        return(
            <>
                <SeaTs>
                    <p>Carregando...</p>
                </SeaTs>
                <Footer>
                    <p>Carregando...</p>
                </Footer>
            </>
        );
    }
}


const SeaTs = styled.div`
    width: 100%;
    height: 100%;
    padding-top: 67px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 117px;
    > p{
        width: 100%;
        height: 110px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 400;
        font-size: 24px;
    }
    .seatsbox{
        width: 92%;
        height: auto;
        display: grid;
        grid-template-columns: 10fr 10fr 10fr 10fr 10fr 10fr 10fr 10fr 10fr 10fr;
        grid-template-rows: 20fr 20fr 20fr 20fr 20fr;
    }
`