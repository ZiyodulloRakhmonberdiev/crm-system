import { useState } from 'react'

export default function Leads () {
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: 'Lidlar',
      length: '1290',
      items: [
        { id: 1, title: 'Usmon Omonov' },
        { id: 2, title: 'Javohir Omonov' },
        { id: 3, title: 'Kamol Omonov' }
      ]
    },
    {
      id: 2,
      title: 'Kutish rejimida',
      length: '156',
      items: [
        { id: 4, title: 'Ikrom Omonov' },
        { id: 5, title: 'Ilhom Omonov' },
        { id: 6, title: 'Islom Omonov' }
      ]
    },
    {
      id: 3,
      title: 'Amalda',
      length: '985',
      items: [
        { id: 7, title: 'Ali Omonov' },
        { id: 8, title: 'Vali Omonov' },
        { id: 9, title: 'Erkin Omonov' }
      ]
    }
  ])

  const [currentBoard, setCurrentBoard] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)

  function dragOverHandler (e) {
    e.preventDefault()
    if (e.target.className == 'item') {
      e.target.style.boxShadow = '0 4px 3px gray'
    }
  }
  function dragLeaveHandler (e) {
    e.target.style.boxShadow = 'none'
  }
  function dragStartHandler (e, board, item) {
    setCurrentBoard(board)
    setCurrentItem(item)
  }
  function dragEndHandler (e) {
    e.target.style.boxShadow = 'none'
  }
  function dropHandler (e, board, item) {
    e.preventDefault()
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)
    const dropIndex = board.items.indexOf(item)
    board.items.splice(dropIndex + 1, 0, currentItem)
    setBoards(
      boards.map(b => {
        if (b.id === board.id) {
          return board
        }
        if (b.id === currentBoard.id) {
          return currentBoard
        }
        return b
      })
    )
    e.target.style.boxShadow = 'none'
  }

  function dropCardHandler (e, board) {
    board.items.push(currentItem)
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)
    setBoards(
      boards.map(b => {
        if (b.id === board.id) {
          return board
        }
        if (b.id === currentBoard.id) {
          return currentBoard
        }
        return b
      })
    )
    e.target.style.boxShadow = 'none'
  }
  return (
    <div className='grid grid-cols-3 gap-4'>
      {boards.map(board => (
        <div
          className='board'
          onDragOver={e => dragOverHandler(e)}
          onDrop={e => dropCardHandler(e, board)}
        >
          <div className='board__title text-2xl mb-2'>{board.title}</div>
          {board.items.map(item => (
            <div
              className='item p-4 bg-white rounded-lg mb-2 cursor-grab'
              draggable={true}
              onDragOver={e => dragOverHandler(e)}
              onDragLeave={e => dragLeaveHandler(e)}
              onDragStart={e => dragStartHandler(e, board, item)}
              onDragEnd={e => dragEndHandler(e)}
              onDrop={e => dropHandler(e, board, item)}
            >
              {item.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
