import { useState } from "react";
import useViewContent from "../pages/hooks/useViewContent";
import Swal from "sweetalert2";
import 'animate.css';

export default function Home() {
  const [page, setPage] = useState(0);
  const { data, isLoading } = useViewContent();

  if (isLoading) {
    return "Loading.................";
  }

  function handleClick() {
    let anchorOffset = window.getSelection().anchorOffset;
    while (/[\w'`’!]/.test(data.book.pages[page - 1].content[anchorOffset]) && anchorOffset > 0) {
      --anchorOffset;
    }
    if (anchorOffset) {
      ++anchorOffset;
    }
    let [token] = data.book.pages[page - 1].tokens.filter(token => {
      return token.position[0] === anchorOffset;
    });
    console.log(anchorOffset, token);
    if (token) {

      modal(token);
    }
  }

  function handleClickNextPage() {
    let anchorOffset = window.getSelection().anchorOffset;
    while (/[\w'`’!]/.test(data.book.pages[page].content[anchorOffset]) && anchorOffset > 0) {
      --anchorOffset;
    }
    if (anchorOffset) {
      ++anchorOffset;
    }
    let [token] = data.book.pages[page].tokens.filter(token => {
      return token.position[0] === anchorOffset;
    });
    console.log(anchorOffset, token);
    if (token) {
      // alert(data.book.pages[page].content.substring(token.position[0], token.position[1]));

      modal(token);
      //  alert(token.value)
    }

  }

  function handleNext() {
    setPage(page + 2);
  }

  function handlePrev() {
    setPage(page - 2);
  }

  return (
    <>
      <div className="open-book">
        <div >
          <header className="header">
            <h1>Book Author:{data.book.author}</h1>
            <h6>Title: {data.book.title}</h6>
          </header>
          <div className="flex justify-content-between">

            {
              page - 1 > 0 ?
                <p onClick={handleClick} className="leftPage">{data.book.pages[page - 1].content.replaceAll("\\\\", "")}</p> :
                null
            }
            <p onClick={handleClickNextPage} className="w-600">{data.book.pages[page].content.replaceAll("\\\\", "")}</p>

          </div>
          <button onClick={handlePrev} disabled={!page}>Prev</button>
          <button onClick={handleNext} disabled={(page === data.book.pages.length - 2)} className="pull-right">Next</button>

        </div>
      </div>
    </>
  );
}


function modal(token) {
  Swal.fire({
    title: token.value,
    imageUrl: 'https://unsplash.it/200/200?fishing',
    width: 400,
    height: 200,
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  });
}

