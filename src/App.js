import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import Logo from './flook.svg';
import Data from './data/posts.json';
import 'materialize-css/dist/css/materialize.min.css';

import './App.css';

const Homepage = () => {
	return (
		<div>
				<Header/>
        <Banner/>
        <Postlist/>
		</div>
	)
};

const Header = () => {
	return (
    <div className='header'>
			<Link to='/testreact'><img src={Logo} alt='FORELOOKER'/></Link>
    </div>
	)
};

const Banner = () => {
	return (
		<div>
    <div className='banner'>
          <span className="new badge red" data-badge-caption="#whatif"></span>
					<span className="new badge red" data-badge-caption="#alternatehistory"></span>
    </div>
		<hr className='tophr'/>
		</div>
	)
};

const Postlist = () => {
	return (
    <div className='mymainpage row'>
      { Data.map((postdetail,i)=>{
        return <div className='col s12 l4'>
                 <Link to={`/post/${postdetail.id}`}>
								 <div className='card'>
                   <div className="card-image">
                     <img src={postdetail.image} alt='{postdetail.id}'/>
                   </div>
										<div className="card-content">
											 <h6 className='cardtitle'>{postdetail.name}</h6>
											 <p className='maincard'>{postdetail.desc}</p>
										</div>
                 </div>
								 </Link>
               </div>
            })}
    </div>
	)
};

function Checkpost() {
  const { id } = useParams();
  let num = Object.values({id})[0];
  const mypost = Data[num];
  return (
    <div>

    <Header/>
		<Banner/>
    <div className='mycontent'>
				<nav className='white z-depth-0 hide-on-med-and-down'>
						{mypost.sections.map((parts,j)=> (
							<Checkcrumb crumbtext={parts.title} />
						))}
				</nav>
        <h4>{mypost.name}</h4>
        {mypost.sections.map((parts,j)=> (
          <div>
            <h5 id={parts.title}>{parts.title} </h5>
            <Checkpic pictext={parts.image} />
            <p className='content'>{parse(parts.content)}</p>
            <Checklink linktext={parts}/>
          </div>
        ))}
    </div>
    </div>
  )
}

function Checkcrumb(crumbtext) {
  let crumb = crumbtext.crumbtext;
  if (crumb !== "") {
		let myid = "#" + crumb;
    return <a href={myid} className="breadcrumb">{crumb}</a>;
  }
  return "";
}

function Checkpic(pictext) {
  let pic = pictext.pictext;
  if (pic !== "") {
    return <img src={pic} width='100%' alt='pictext.pictext'/>;
  }
  return "";
}

function Checklink(linktext) {
  let link = linktext.linktext.link;
	let top = linktext.linktext.hr;
  if (link !== "" && top !== "") {
    return <div><a href={link} target='_blank' rel='noreferrer'>More info</a> / <a href='#top'>Top</a><hr className='myhr'/></div>;
  }
	if (link === "" && top !== "") {
		return <div><a href='#top'>Top</a><hr className='myhr'/></div>;
	}

  return "";
}

export {Homepage, Checkpost};
