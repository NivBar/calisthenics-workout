const BlockSelector = ({ blocks, currentBlock, onBlockChange }) => {
  const blockKeys = Object.keys(blocks);

  return (
    <div style={styles.container}>
      <div style={styles.scrollContainer}>
        {blockKeys.map((blockKey) => {
          const block = blocks[blockKey];
          const isActive = currentBlock === blockKey;
          const exerciseCount = block.exercises.length;

          return (
            <button
              key={blockKey}
              onClick={() => onBlockChange(blockKey)}
              style={{
                ...styles.blockButton,
                ...(isActive ? styles.activeButton : {}),
              }}
            >
              <div style={styles.blockLabel}>
                {blockKey === 'Stretching' ? '🧘 Stretching' : blockKey}
              </div>
              <div style={styles.blockName}>{block.name}</div>
              <div style={styles.exerciseCount}>
                {exerciseCount} {exerciseCount === 1 ? 'exercise' : 'exercises'}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    marginBottom: '32px',
    position: 'sticky',
    top: 0,
    backgroundColor: '#0a0a0a',
    zIndex: 100,
    paddingTop: '20px',
    paddingBottom: '20px',
    borderBottom: '1px solid #2a2a2a',
  },
  scrollContainer: {
    display: 'flex',
    gap: '12px',
    overflowX: 'auto',
    paddingBottom: '8px',
    scrollbarWidth: 'thin',
    scrollbarColor: '#3a3a3a #1a1a1a',
  },
  blockButton: {
    flex: '0 0 auto',
    minWidth: '140px',
    padding: '16px 20px',
    backgroundColor: '#1a1a1a',
    border: '2px solid #2a2a2a',
    borderRadius: '12px',
    color: '#b0b0b0',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'left',
    fontFamily: 'inherit',
  },
  activeButton: {
    backgroundColor: '#2a2a2a',
    borderColor: '#00ff88',
    color: '#ffffff',
    transform: 'scale(1.05)',
  },
  blockLabel: {
    fontSize: '14px',
    fontWeight: '700',
    marginBottom: '4px',
    color: '#00ff88',
  },
  blockName: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '4px',
  },
  exerciseCount: {
    fontSize: '12px',
    color: '#666',
  },
};

// Add hover styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    .block-button:not(.active):hover {
      border-color: #3a3a3a;
      background-color: #2a2a2a;
      transform: translateY(-2px);
    }
    .scroll-container::-webkit-scrollbar {
      height: 8px;
    }
    .scroll-container::-webkit-scrollbar-track {
      background: #1a1a1a;
      border-radius: 4px;
    }
    .scroll-container::-webkit-scrollbar-thumb {
      background: #3a3a3a;
      border-radius: 4px;
    }
    .scroll-container::-webkit-scrollbar-thumb:hover {
      background: #4a4a4a;
    }
  `;
  document.head.appendChild(styleSheet);
}

export default BlockSelector;

// Made with Bob
