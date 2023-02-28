import { render, screen } from '@testing-library/react';
import { makeFakeReview } from '../../utils/mocks';
import ProductReviewCard from './product-review-card';


describe('Component: ProductReviewCard', () => {
  it('should render correctly', () => {
    render(
        <ProductReviewCard
        review={makeFakeReview()}/>
    );

    expect(screen.getByText(/Оценка:/i)).toBeInTheDocument();
    expect(screen.getByText(/Достоинства:/i)).toBeInTheDocument();
    expect(screen.getByText(/Недостатки:/i)).toBeInTheDocument();
    expect(screen.getByText(/Комментарий:/i)).toBeInTheDocument();
  })
})
