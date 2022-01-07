export default function NotificationState({ isRead, onClick }) {
    return (
      <a onClick={onClick} className="p-3">
        <div
          style={{
            width: "30px",
            height: "30px",
            backgroundColor: isRead ? "#10B981" : "#FCD34D",
            borderRadius: "50%"
          }}
        />
      </a>
    );
  }
  