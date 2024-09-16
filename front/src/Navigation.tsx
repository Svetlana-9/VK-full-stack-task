import './Navigation.css';
import Section from './Section.tsx'

interface NavigationProps {
  onClick: Function
}

export default function Navigation ({onClick}: NavigationProps) {
  return (
    <div className='navigation'>
      <Section onClick ={() => onClick ('allCats')} name = {'Все котики'} />
      <Section onClick ={() => onClick ('favouriteCats')} name = {'Любимые котики'}/> 
    </div>
  )
}