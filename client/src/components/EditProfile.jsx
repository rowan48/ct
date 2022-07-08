import React, {useEffect, useState} from "react";
import {Form, TextField, SubmitField, NumberField} from 'react-components-form';
import Schema from 'form-schema-validation';
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";
import {render} from 'react-dom';




const EditProfileSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    nationalID: {
        type: String,
    },
    region: {
        type: String,
    },
    sports: {
        type: [String],
    },
    address: {
        type: String,
    },
    // img:
    //     {
    //         data: Buffer,
    //         contentType: String
    //     }
});








let EditProfile = () => {
    //let regions=[];


    const [Region,setRegion] = useState({
        _id: "",
        name: ""
    });
    const [Player, setPlayer] = useState({
        sports: [],
        name: "",
        age: 0,
        address: "",
        img:"",
        region:"",
        gender:"",
        rate:"",
        nationalID:""

    });

    useEffect(() => {
        //let token = window.localStorage.getItem("token");
        //let id = window.localStorage.getItem("id");
        let id ="62c24c0c0d6372c368cb51ac";

        const headers = {
            "Content-Type": "application/json",
            //Authorization: "token " + token,
        };

        axios
            .get(" http://localhost:4000/api/players/card/" +id , {
                headers,
            })
            .then((res) => {
                console.log(res.data.name);

                setPlayer(res.data);

            });

        axios
            .get("http://localhost:4000/api/regions/"  , {
                headers,
            })
            .then((res) => {
                let regions=[]
                regions=res.data.map((item)=>{
                    return{
                        label: item.name,
                        value: item._id,

                    };
                });
                setRegion(regions)
            });

    }, []);

    // const handleChangeTags = (options) => {
    //     setPlayer((prevState) => ({ ...prevState, Region: options }));
    // };
    const [selected, setSelected] = useState([]);


    const handleChange = (event) => {
            setPlayer({ ...Player, [event.target.name]: event.target.value });


        console.log(Player);
    };

    function editPlayer(event) {
        event.preventDefault();
        console.log("data")
        console.log(event)
        console.log("dd");
        console.log(Player);
         setPlayer(Player)
       // event.preventDefault();
        // let token = window.localStorage.getItem("token");
        // let id = window.localStorage.getItem("id");
        const headers = {
            "Content-Type": "multipart/form-data",
            // Authorization: "token " + token,
        };
        let id ="62c24c0c0d6372c368cb51ac";
        let baseUrl ="http://localhost:4000/api/players/card/62c24c0c0d6372c368cb51ac/update";

        axios
            .patch(baseUrl, {...Player, sports:Player.sports.map(o=>Number(o.value)[0] )},{headers}
            )
            .then((response) => {

                console.log(response);
               // navigate("/developer/profile")
            })
            .catch((response) => {

                console.log(response);

            });

        console.log(Player);

    }



    return (
        <div>
            <form className="col-4 mx-auto" onSubmit={(e) => editPlayer(e)}>
            {/*<form*/}
            {/*    className="col-4 mx-auto" onSubmit={editPlayer}*/}
            {/*    // schema={EditProfileSchema}*/}
            {/*    // onSubmit={(e) =>editPlayer(e) }*/}
            {/*    // onError={(errors, data) => console.log('error', errors, data)}*/}

           {/*// >*/}
                {/*<TextField*/}
                {/*    name="name"*/}
                {/*    label="name"*/}
                {/*    type="text"*/}
                {/*    onChange={(e) => {*/}
                {/*        handleChange(e);*/}
                {/*    }}*/}
                {/*/>*/}
                <label>name</label>
                <input name="name"
                       value={Player.name}
                       type="text"
                       onChange={(e) => {
                           handleChange(e);
                       }}
                /><br/>
                {/*<TextField*/}
                {/*    name="gender"*/}
                {/*    label="gender"*/}
                {/*    type="text"*/}
                {/*    onChange={(e) => {*/}
                {/*        handleChange(e);*/}
                {/*    }}*/}
                {/*/>*/}
                <label>gender</label>
                <input name="gender"
                       value={Player.gender}
                       type="text"
                       onChange={(e) => {
                           handleChange(e);
                       }}
                /><br/>
                <label>age</label>
                <input name="age"
                       value={Player.age}
                       type="text"
                       onChange={(e) => {
                           handleChange(e);
                       }}
                /><br/>
                {/*<NumberField*/}
                {/*    name="age"*/}
                {/*    label="age"*/}
                {/*    type="text"*/}
                {/*    onChange={(e) => {*/}
                {/*        handleChange(e);*/}
                {/*    }}*/}
                {/*/>*/}
                <label>nationalID</label>
                <input name="nationalID"
                       label="nationalID"
                       type="text"
                       onChange={(e) => {
                           handleChange(e);
                       }}
                /><br/>
                {/*<TextField name="nationalID" label="nationalID" type="text"/>*/}
                <MultiSelect
                    options={Region}
                    value={selected}
                    onChange={setSelected}
                    labelledBy="Select"
                />
                {/*<SubmitField value="Submit"/>*/}
                <button className="btn btn-primary btn-block mb-2" type="submit">Update</button>
            </form>

        </div>
    );


};

export default EditProfile;
