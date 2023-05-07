import React, {useState, useEffect} from 'react';
import axios from 'axios';


const AddCharacteristics = ({setChars, chars}) => {
  // const [chars, setChars] = useState(chars)

  const temp = [];

  const activeCharacteristics = () =>
  {  axios({
      method: 'GET',
      url: '/api/reviews/meta?product_id=40344'
    })
    .then((response) => {
      let incoming = Object.keys(response.data.characteristics)
      // console.log(incoming)
      incoming.forEach(el => {
        temp.push({name: el,
          val1: allCharacteristics[el][1],
          val2: allCharacteristics[el][2],
          val3: allCharacteristics[el][3],
          val4: allCharacteristics[el][4],
          val5: allCharacteristics[el][5],
        })
      })
    })}

  useEffect(() => {
    // setTimeout(() => setChars(temp), 400)
    // setChars(temp)
    // setChars(temp)
    activeCharacteristics()
  },[])


  const allCharacteristics = {
    Size: { //135232
      1: 'A size too small',
      2: '1/2 a size too small',
      3: 'Perfect',
      4: '1/2 a size too big',
      5: 'A size too wide',
    },
    Width: { //135233
      1: 'Too narrow',
      2: 'Slightly narrow',
      3: 'Perfect',
      4: 'Slightly Wide',
      5: 'A size too wide',
    },
    Comfort: { //135221
      1: 'Uncomfortable',
      2: 'Slightly uncomfortable',
      3: 'Ok',
      4: 'Comfortable',
      5: 'Perfect'
    },
    Quality: { //135222
      1: 'Poor',
      2: 'Below average',
      3: 'What I expected',
      4: 'Pretty great',
      5: 'Perfect'
    },
    Length: { //135220
      1: 'Runs short',
      2: 'Runs slighty short',
      3: 'Perfect',
      4: 'Runs slightly long',
      5: 'Runs long'
    },
    Fit: { //135219
      1: 'Runs tight',
      2: 'Runs slightly tight',
      3: 'Perfect',
      4: 'Runs slightly long',
      5: 'Runs long'
    }
  }
//posting characteristics = id number and value => key: value
  const Rows = (props) => {
    const {name, val1, val2, val3, val4, val5} = props;
    return (<tr>
      <td>{name}</td>
      <td><input type="radio" value="1" name={name}></input>{val1}</td>
      <td><input type="radio" value="2" name={name}></input>{val2}</td>
      <td><input type="radio" value="3" name={name}></input>{val3}</td>
      <td><input type="radio" value="4" name={name}></input>{val4}</td>
      <td><input type="radio" value="5" name={name}></input>{val5}</td>
    </tr>
    )
  }

  const Table = ({chars}) => {
    // const {data} = props
    // console.log('this is data', data)
    return(
      <table>
        <thead>
          <tr>
          <th></th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>{chars}</td></tr>
          {
            chars.map(row =>
              // console.log('this is row', row)

              <Rows name={row.name}
                val1={row.val1}
                val2={row.val2}
                val3={row.val3}
                val4={row.val4}
                val5={row.val5} />
            )
          }
        </tbody>
      </table>
    )
  }

  return (
    <div>
      <Table chars={chars} />
    </div>
  )

};

export default AddCharacteristics;