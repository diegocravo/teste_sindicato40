import React from "react";
import { Link } from "react-router-dom";
import * as db from "../firestore";
import defaultImage from "../../static/default.svg";
import Empty from "./shared/Empty";
import Error from "./shared/Error";
import Loading from "./shared/Loading";
import useSWR from 'swr';

function UserLists({ user }) {

  const { data: lists, error} = useSWR(user.uid, db.getUserLists)

  if (error) return <Error message={error.message} />
  if(!lists) return <Loading />
  if(lists.length === 0) return <Empty />

  // const [lists, setLists] = React.useState([]);

  // React.useEffect(() => {
  //   db.getUserLists('4lUoJzqIXQeAc8A7gsnFzfP678p1').then(list => {
  //     setLists(list);
  //   });
  // }, [])

  return (
    <>
      <UserListCount count={lists.length} />
      <section className="text-gray-500 bg-gray-900 body-font">
        <div className="container px-5 py-5 mx-auto">
          <div className="flex flex-wrap -m-4">
            {/* display lists that user is part of  */}
            {lists.map(list => (
              <ListItem key={list.id} list={list} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function UserListCount({count}) {

  return (
    <div className="container px-5 py-5 mb-6 bg-gray-800 rounded mx-auto flex justify-center text-center">
      <div className="p-4 sm:w-1/4 w-1/2">
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="text-green-500 w-12 h-12 mb-3 inline-block"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">
          {count}
        </h2>
        <p className="leading-relaxed">Benefícios Cadastrados</p>
      </div>
    </div>
  );
}

function ListItem({ list }) {

  const { id, name, description, image, users } = list;

  return (
    <div className="lg:w-1/3 sm:w-1/2 p-4">
      {" "}
      <Link to={`/${id}`}>
        <div className="flex relative">
          <img
            alt="gallery"
            className="absolute inset-0 w-full h-full object-cover object-center"
            src={image || defaultImage}
          />
          <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-800 bg-gray-900 opacity-0 hover:opacity-100">
            <ul className="list-disc">
              <li className="tracking-widest text-sm title-font font-medium text-orange-500 mb-1">
                {users[0].name} {users.length > 1 && `+ ${users.length - 1} others`}
              </li>
            </ul>
            <h1 className="title-font text-lg font-medium text-white mb-3">
              {name}
            </h1>
            <p className="leading-relaxed">{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default UserLists;
