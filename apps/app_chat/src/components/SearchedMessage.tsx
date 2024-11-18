interface SearchedMessageProps {
  content: string;
  query: string;
}

const SearchedMessage: React.FC<SearchedMessageProps> = ({
  content,
  query,
}) => {
  return (
    <p className="dark:text-dark-lavender max-[]: truncate">
      {truncateAndHighlight(content, query, 50)}
    </p>
  );
};

const truncateAndHighlight = (
  text: string,
  query: string,
  maxLength: number
) => {
  if (!query)
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

  const regex = new RegExp(`(${query})`, 'gi');
  const matchIndex = text.toLowerCase().indexOf(query.toLowerCase());

  if (matchIndex === -1) {
    // No match, truncate normally
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }

  const start = Math.max(0, matchIndex - Math.floor(maxLength / 2)); // Context before query
  const end = Math.min(
    text.length,
    matchIndex + query.length + Math.floor(maxLength / 2)
  ); // Context after query

  const snippet = `${start > 0 ? '...' : ''}${text.slice(start, end)}${
    end < text.length ? '...' : ''
  }`;

  // Highlight the matches
  const highlighted = snippet.split(regex).map((part, index) =>
    regex.test(part) ? (
      <span key={index} className="highlight dark:text-yellow-300">
        {part}
      </span>
    ) : (
      part
    )
  );

  return highlighted;
};

export default SearchedMessage;
