import { useState, useCallback } from 'react';

export function useSwipeNavigation() {
  const [currentPage, setCurrentPage] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndY, setTouchEndY] = useState(0);
  const [isTouching, setIsTouching] = useState(false);

  const handleTouchStart = useCallback((e: any) => {
    try {
      const x = e.nativeEvent.pageX;
      const y = e.nativeEvent.pageY;
      setTouchStart(x);
      setTouchStartY(y);
      setIsTouching(true);
      console.log('Touch start:', { x, y });
    } catch (error) {
      console.log('Touch start error:', error);
    }
  }, []);

  const handleTouchMove = useCallback((e: any) => {
    try {
      const x = e.nativeEvent.pageX;
      const y = e.nativeEvent.pageY;
      setTouchEnd(x);
      setTouchEndY(y);
      console.log('Touch move:', { x, y });
    } catch (error) {
      console.log('Touch move error:', error);
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    try {
      setIsTouching(false);
      
      if (!touchStart || !touchEnd) {
        console.log('No touch data:', { touchStart, touchEnd });
        return;
      }
      
      const distanceX = touchStart - touchEnd;
      const distanceY = Math.abs((touchStartY || 0) - (touchEndY || 0));
      
      console.log('Swipe distances:', { x: distanceX, y: distanceY });
      
      // For About page (page 2), be more lenient with horizontal swipes
      // to make it easier to navigate away
      const isAboutPage = currentPage === 2;
      const horizontalThreshold = isAboutPage ? 30 : 50; // Lower threshold on About page
      const verticalThreshold = isAboutPage ? 150 : 100; // Higher vertical tolerance on About page
      
      // Only trigger page navigation if horizontal movement is significant
      // and vertical movement is within tolerance
      if (Math.abs(distanceX) > horizontalThreshold && distanceY < verticalThreshold) {
        const isLeftSwipe = distanceX > horizontalThreshold;
        const isRightSwipe = distanceX < -horizontalThreshold;

        if (isLeftSwipe) {
          console.log('Swiping left - next page');
          setCurrentPage((prev) => (prev + 1) % 3);
        } else if (isRightSwipe) {
          console.log('Swiping right - previous page');
          setCurrentPage((prev) => (prev - 1 + 3) % 3);
        }
      } else {
        console.log('Movement too small or too vertical - allowing scroll');
      }
      
      setTouchStart(0);
      setTouchEnd(0);
      setTouchStartY(0);
      setTouchEndY(0);
    } catch (error) {
      console.log('Touch end error:', error);
      setTouchStart(0);
      setTouchEnd(0);
      setTouchStartY(0);
      setTouchEndY(0);
      setIsTouching(false);
    }
  }, [touchStart, touchEnd, touchStartY, touchEndY, currentPage]);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return {
    currentPage,
    isTouching,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    goToPage,
  };
}
