// This task is meant to be ambiguous and a bit poorly defined. In this exercise, we will work on a cat picture feed.
// Each picture in the feed will also have a text field for the user to enter a note for each picture. You should keep
// the state of the picture URL and the note together (imagine that it was coming from a SQL read). (If this is
// confusing, definitely ask for clarification.) The feed will start empty and the user should have the ability to add
// more cat pictures to the feed. For example, if there are currently two cat pictures, and I add another, there should
// now be three cat pictures in total shown.
//
// To add a picture to the feed, we will perform a GET request from
// https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=bOoHBz-8t which returns
// a JSON {url: image_url} with a random image. The initial note for each picture will start off empty but should
// be editable any time after.
//
// I'm not looking for the UI to be anything special because this exercise is not a test of your UI intuition, but
// it should definitely be usable. Feel free to use inline styling. We will code only in App.js, so do not make new
// files. You may use any libraries that you wish. The allotted time for this exercise is 30 minutes. Choose wisely
// where you want to spend your time. We are pair programming and I can help answer your questions and I will fix
// some of your small typos to help the app compile.

import { ChangeEvent, ChangeEventHandler, useState } from "react";

interface ICat {
  imgUrl: string;
  note: string;
}

interface IDetailsProps {
  imgUrl: string;
  note: string;
  onNoteChange: ChangeEventHandler<HTMLInputElement>;
}

function Details({ imgUrl, note, onNoteChange }: IDetailsProps) {
  return (
    <div key={imgUrl}>
      <img style={{ height: "300px" }} alt="cat" src={imgUrl} />
      <input value={note} onChange={onNoteChange} />
    </div>
  );
}

export default function Cats() {
  const [cats, setCats] = useState<ICat[]>([]);

  async function getCat() {
    const response = await fetch("https://api.thecatapi.com/v1/images/search");
    const data = await response.json();
    const imageUrl = data[0].url;

    setCats([...cats, { imgUrl: imageUrl, note: "" }]);
  }

  const onNoteChange = (index: number) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      const copy = [...cats];
      copy[index].note = e.target.value;
      setCats(copy);
    };
  };

  return (
    <>
      <button onClick={getCat}>MORE CATS</button>
      {cats.map((cat, index) => {
        return (
          <Details
            imgUrl={cat.imgUrl}
            note={cat.note}
            onNoteChange={onNoteChange(index)}
          />
        );
      })}
    </>
  );
}
