import './index.css';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
export default function NotificationState({ isRead, onClick }) {
  return (
    <a onClick={onClick} className="padding3">
      <div
        style={{
          width: "50px",
          height: "50px",
          //backgroundColor: isRead ? "#10B981" : "#FCD34D",
          // borderRadius: "50%"
        }}>
          {isRead ? <CheckBoxIcon color='primary'/> : <CheckBoxOutlineBlankIcon color='disabled'/>}
        </div>

    </a>
  );
}
  