import style from './sidepanel.module.css'

export default function SidePanel({children}) {
  return (
    <div className={style.sidePanel}>
      {children}
    </div>
  )
}