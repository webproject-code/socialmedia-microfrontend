// import { LuSearch } from 'react-icons/lu';
// import { Box, Input } from '@social-media/evoke-ui';
// import { useCallback, useEffect, useState } from 'react';
// import useDebounce from '../hooks/useDebounce';

// interface GenericSearchProps<T> {
//   placeholder: string;
//   apiHookFunction: (searchTerm: string,userId?:string) => { data: T | undefined };
//   dataSetterFn: (data: T) => void;
//   debounceTime?: number;
//   userId?:string
// }

// export function GenericSearch<T>({
//   placeholder,
//   apiHookFunction,
//   dataSetterFn,
//   debounceTime = 300,
//   userId
// }: GenericSearchProps<T>) {
//   const [searchTerm, setSearchTerm] = useState('');
//   const debouncedSearchTerm = useDebounce(searchTerm, debounceTime);
//   const { data } = apiHookFunction(debouncedSearchTerm,userId);

//   const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value)
//   }, [])

//   useEffect(() => {
//     if (data) {
//       dataSetterFn(data);
//     }
//   }, [data, dataSetterFn]);

//   return (
//     <Box className="w-full">
//       <Input
//         type="text"
//         name="search"
//         value={searchTerm}
//         onChange={handleChange}
//         placeholder={placeholder}
//       >
//         <LuSearch />
//       </Input>
//     </Box>
//   );
// }
