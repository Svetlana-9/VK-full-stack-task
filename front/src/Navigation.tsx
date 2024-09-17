import './Navigation.css';
import Section from './Section.tsx'

interface NavigationProps {
  onClick: Function
}

export default function Navigation (props: NavigationProps) {
  return (
    <div className='navigation'>
      <Section onClick ={() => props.onClick ('allCats')} name = {'Все котики'} />
      <Section onClick ={() => props.onClick ('favouriteCats')} name = {'Любимые котики'}/> 
    </div>
  )
}