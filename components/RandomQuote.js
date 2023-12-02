import React, { useEffect, useState } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 3,
    borderColor: "#D37506",
  },
  quoteContent: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  quoteContentText: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
  quoteAuthorText: {
    color: '#ccc',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  underline: {
    backgroundColor: "#D37506",
    height: 1,
    width: '85%',
    marginTop: 10,
    alignSelf: 'center',
  },
});