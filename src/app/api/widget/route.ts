/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const script = `
    (function() {
      const WIDGET_BASE_URL = '${process.env.NEXT_PUBLIC_APP_URL}';
      console.log('Widget initializing, base URL:', WIDGET_BASE_URL); // Debug log

      class FeedbackWidget {
        constructor() {
          this.config = null;
          this.widgetElement = null;
          this.modalElement = null;
          console.log('FeedbackWidget instance created'); // Debug log
        }

        async init(widgetId) {
          try {
            console.log('Initializing widget with ID:', widgetId); // Debug log
            
            // Fetch widget configuration
            const response = await fetch(\`\${WIDGET_BASE_URL}/api/widget/config/\${widgetId}\`);
            this.config = await response.json();
            console.log('Widget config loaded:', this.config); // Debug log
            
            // Initialize widget after getting config
            this.injectStyles();
            this.render();
          } catch (error) {
            console.error('Failed to initialize feedback widget:', error);
          }
        }

        injectStyles() {
          console.log('Injecting styles with config:', this.config); // Debug log
          const styles = \`
            .feedback-widget-trigger {
              position: fixed;
              \${this.config?.position === 'bottom-right' ? 'bottom: 20px; right: 20px;' : 
                this.config?.position === 'bottom-left' ? 'bottom: 20px; left: 20px;' :
                this.config?.position === 'top-right' ? 'top: 20px; right: 20px;' :
                this.config?.position === 'top-left' ? 'top: 20px; left: 20px;' :
                'bottom: 20px; right: 20px;'}
              background: \${this.config?.theme === 'dark' ? '#1f2937' : '#ffffff'};
              border-radius: 8px;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
              padding: 16px;
              z-index: 9999;
              \${this.config?.custom_css || ''}
            }

            .feedback-widget-modal {
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background: \${this.config?.theme === 'dark' ? '#1f2937' : '#ffffff'};
              color: \${this.config?.theme === 'dark' ? '#ffffff' : '#000000'};
              padding: 24px;
              border-radius: 8px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
              z-index: 10000;
              width: 90%;
              max-width: 500px;
            }

            .feedback-widget-overlay {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.5);
              z-index: 9999;
            }
          \`;

          const styleSheet = document.createElement('style');
          styleSheet.textContent = styles;
          document.head.appendChild(styleSheet);
          console.log('Styles injected successfully'); // Debug log
        }

        render() {
          console.log('Rendering widget button'); // Debug log
          this.widgetElement = document.createElement('div');
          this.widgetElement.className = 'feedback-widget-trigger';
          this.widgetElement.innerHTML = \`
            <button 
              class="feedback-widget-button"
              onclick="window.FeedbackWidget.openModal()"
              style="background: #4f46e5; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;"
            >
              \${this.config?.button_text || 'Give Feedback'}
            </button>
          \`;
          document.body.appendChild(this.widgetElement);
          console.log('Widget button rendered'); // Debug log
        }

        openModal() {
          const overlay = document.createElement('div');
          overlay.className = 'feedback-widget-overlay';
          
          this.modalElement = document.createElement('div');
          this.modalElement.className = 'feedback-widget-modal';
          this.modalElement.innerHTML = \`
            <h3 style="margin-bottom: 16px; font-size: 1.25rem; font-weight: 600;">
              Share Your Feedback
            </h3>
            <form id="feedback-widget-form">
              <input 
                type="text" 
                name="name"
                placeholder="Name" 
                class="feedback-widget-input"
                required
              >
              <input 
                type="email" 
                name="email"
                placeholder="Email" 
                class="feedback-widget-input"
                required
              >
              <textarea 
                name="feedback"
                placeholder="Your feedback" 
                class="feedback-widget-input"
                rows="4"
                required
              ></textarea>
              <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button 
                  type="button" 
                  class="feedback-widget-button" 
                  style="background: #6b7280;"
                  onclick="window.FeedbackWidget.closeModal()"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  class="feedback-widget-button"
                >
                  Submit
                </button>
              </div>
            </form>
          \`;

          document.body.appendChild(overlay);
          document.body.appendChild(this.modalElement);

          document.getElementById('feedback-widget-form').onsubmit = (e) => this.handleSubmit(e);
        }

        closeModal() {
          const overlay = document.querySelector('.feedback-widget-overlay');
          if (overlay) overlay.remove();
          if (this.modalElement) this.modalElement.remove();
        }

        async handleSubmit(e) {
          e.preventDefault();
          const formData = new FormData(e.target);
          
          try {
            const response = await fetch(\`\${WIDGET_BASE_URL}/api/feedback\`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                projectId: this.config.business_id,
                name: formData.get('name'),
                email: formData.get('email'),
                feedback: formData.get('feedback'),
              }),
            });

            if (!response.ok) throw new Error('Failed to submit feedback');

            alert('Thank you for your feedback!');
            this.closeModal();
          } catch (error) {
            alert('Error submitting feedback. Please try again.');
          }
        }

        async submitFeedback(formData) {
          const feedback = {
            projectId: this.config.business_id,
            name: formData.get('name'),
            email: formData.get('email'),
            feedback: formData.get('feedback'),
            rating: this.rating,
            emoji: this.emoji,
            customAnswers: this.getCustomAnswers(formData),
            metadata: {
              screen_size: \`\${window.innerWidth}x\${window.innerHeight}\`,
              url: window.location.href,
              referrer: document.referrer,
            },
          };

          let attempt = 0;
          while (attempt < RETRY_DELAYS.length + 1) {
            try {
              const response = await this.sendFeedbackWithTimeout(feedback);
              
              if (response.ok) {
                this.showSuccess();
                this.closeModal();
                return;
              }

              const data = await response.json();
              throw new Error(data.error || 'Failed to submit feedback');
            } catch (error) {
              if (attempt === RETRY_DELAYS.length) {
                // Last attempt failed
                this.showError(error);
                // Store in localStorage for later retry
                this.storeFeedbackForRetry(feedback);
                return;
              }

              // Wait before retrying
              await new Promise(resolve => setTimeout(resolve, RETRY_DELAYS[attempt]));
              attempt++;
            }
          }
        }

        // Send feedback with timeout
        sendFeedbackWithTimeout(feedback, timeout = 5000) {
          return Promise.race([
            fetch(\`\${WIDGET_BASE_URL}/api/feedback\`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(feedback),
            }),
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error('Request timeout')), timeout)
            ),
          ]);
        }

        // Store feedback for later retry
        storeFeedbackForRetry(feedback) {
          const storedFeedback = JSON.parse(
            localStorage.getItem('pendingFeedback') || '[]'
          );
          storedFeedback.push({ ...feedback, timestamp: Date.now() });
          localStorage.setItem('pendingFeedback', JSON.stringify(storedFeedback));
        }

        // Retry sending stored feedback
        async retryStoredFeedback() {
          const storedFeedback = JSON.parse(
            localStorage.getItem('pendingFeedback') || '[]'
          );
          if (storedFeedback.length === 0) return;

          const newStoredFeedback = [];
          for (const feedback of storedFeedback) {
            try {
              const response = await this.sendFeedbackWithTimeout(feedback);
              if (!response.ok) {
                newStoredFeedback.push(feedback);
              }
            } catch (error) {
              newStoredFeedback.push(feedback);
            }
          }

          localStorage.setItem(
            'pendingFeedback',
            JSON.stringify(newStoredFeedback)
          );
        }

        showSuccess() {
          const toast = document.createElement('div');
          toast.className = 'feedback-widget-toast success';
          toast.textContent = 'Thank you for your feedback!';
          document.body.appendChild(toast);
          setTimeout(() => toast.remove(), 3000);
        }

        showError(error) {
          const toast = document.createElement('div');
          toast.className = 'feedback-widget-toast error';
          toast.textContent = 'Failed to submit feedback. It will be sent when connection is restored.';
          document.body.appendChild(toast);
          setTimeout(() => toast.remove(), 5000);
        }

        getCustomAnswers(formData) {
          const answers = {};
          this.config.questions.forEach((question, index) => {
            answers[\`question_\${index + 1}\`] = formData.get(\`question_\${index + 1}\`);
          });
          return answers;
        }
      }

      // Initialize widget and attempt to retry stored feedback
      window.FeedbackWidget = new FeedbackWidget();
      console.log('FeedbackWidget added to window object'); // Debug log
      window.addEventListener('online', () => {
        window.FeedbackWidget.retryStoredFeedback();
      });
    })();
  `;

  return new NextResponse(script, {
    headers: {
      "Content-Type": "application/javascript",
      "Cache-Control": "public, max-age=3600",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 