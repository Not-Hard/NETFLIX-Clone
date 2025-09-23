

const Footer = () => {
    // Footer component to link the github repo and the name of the developer
  return (
    <footer className="w-full bg-black text-gray-400 text-sm p-4 text-left">
      <p>
        Developed by{' '}
        <a
          href="https://github.com/Not-Hard"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:underline"
        >
          Not-Hard
        </a>
        . The source code is available on{' '}
        <a
          href="https://github.com/Not-Hard/Netflix-Clone"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:underline"
        >
          GitHub
        </a>
        .
      </p>
    </footer>
  )
}

export default Footer