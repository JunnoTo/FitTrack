import React, { useEffect, useState } from 'react';
import { View, Text, Animated } from 'react-native';
import styles from '../styles/randomQuote.js';

export default function RandomQuote({ onComplete }) {
  const [quoteContent, setQuoteContent] = useState('');
  const [quoteAuthor, setQuoteAuthor] = useState('');
  const [opacity] = useState(new Animated.Value(1));

  useEffect(() => {
    const fetchRandomQuote = async () => {
      try {
        const response = await fetch('https://api.quotable.io/quotes/random?tags=inspirational|motivational');
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          const { content, author } = data[0];
          setQuoteContent(content);
          setQuoteAuthor(author);

          setTimeout(() => {
            Animated.timing(opacity, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }).start(() => {
              onComplete();
            });
          }, 8000);
        } else {
          throw new Error('Invalid data structure or empty response');
        }
      } catch (error) {
        console.error('Error fetching quote:', error);
        setQuoteContent('Error fetching quote');
        setQuoteAuthor('');
      }
    };

    fetchRandomQuote();
  }, [opacity, onComplete]);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
        <View style={styles.quoteContent}>
            <Text style={styles.quoteContentText}>{quoteContent}</Text>
            <Text style={styles.quoteAuthorText}>- {quoteAuthor}</Text>
        </View>
            <View style={styles.underline}/>
    </Animated.View>
  );
};
