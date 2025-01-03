import { NextResponse } from "next/server";

export async function GET() {
  // This is a simplified version of the widget script
  const script = `
    (function() {
      // Widget styles
      const styles = \`
        .feedback-widget {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          padding: 16px;
          z-index: 9999;
        }
        .feedback-widget button {
          background: #4f46e5;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
        }
        .feedback-widget button:hover {
          background: #4338ca;
        }
      \`;

      // Create and inject styles
      const styleSheet = document.createElement("style");
      styleSheet.textContent = styles;
      document.head.appendChild(styleSheet);

      // Widget initialization
      window.FeedbackWidget = {
        init: function(projectId) {
          this.projectId = projectId;
          this.render();
        },
        
        render: function() {
          const widget = document.createElement('div');
          widget.className = 'feedback-widget';
          widget.innerHTML = \`
            <button onclick="FeedbackWidget.openFeedback()">
              Give Feedback
            </button>
          \`;
          document.body.appendChild(widget);
        },

        openFeedback: function() {
          // Create modal for feedback
          const modal = document.createElement('div');
          modal.style = \`
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            z-index: 10000;
          \`;
          
          modal.innerHTML = \`
            <h3 style="margin-bottom: 16px;">Share Your Feedback</h3>
            <form id="feedback-form">
              <input type="text" placeholder="Name" style="display: block; width: 100%; margin-bottom: 8px; padding: 8px;" required>
              <input type="email" placeholder="Email" style="display: block; width: 100%; margin-bottom: 8px; padding: 8px;" required>
              <textarea placeholder="Your feedback" style="display: block; width: 100%; margin-bottom: 8px; padding: 8px;" required></textarea>
              <div style="display: flex; gap: 8px;">
                <button type="submit" style="background: #4f46e5; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
                  Submit
                </button>
                <button type="button" onclick="FeedbackWidget.closeModal()" style="background: #e5e7eb; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
                  Cancel
                </button>
              </div>
            </form>
          \`;

          document.body.appendChild(modal);
          
          // Handle form submission
          document.getElementById('feedback-form').onsubmit = (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            
            fetch('/api/feedback', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                projectId: this.projectId,
                name: formData.get('name'),
                email: formData.get('email'),
                feedback: formData.get('feedback'),
              }),
            })
            .then(response => {
              if (response.ok) {
                alert('Thank you for your feedback!');
                this.closeModal();
              } else {
                throw new Error('Failed to submit feedback');
              }
            })
            .catch(error => {
              alert('Error submitting feedback. Please try again.');
            });
          };
        },

        closeModal: function() {
          const modal = document.querySelector('.feedback-modal');
          if (modal) modal.remove();
        }
      };
    })();
  `;

  return new NextResponse(script, {
    headers: {
      "Content-Type": "application/javascript",
    },
  });
} 