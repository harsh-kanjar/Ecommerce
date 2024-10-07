import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const itemData = [
  
    {
        img: 'image_listing/2.jpg',
        title: 'Books',
    },
    {
        img: 'image_listing/3.jpg',
        title: 'Sink',
    },
    {
        img: 'image_listing/4.jpg',
        title: 'Kitchen',
    },
    {
        img: 'image_listing/5.jpg',
        title: 'Blinds',
    },
    {
        img: 'image_listing/6.jpg',
        title: 'Chairs',
    },
    {
        img: 'image_listing/7.jpg',
        title: 'Laptop',
    },
    {
        img: 'image_listing/8.jpg',
        title: 'Laptop',
    },
    {
        img: 'image_listing/9.jpg',
        title: 'Laptop',
    },
    {
        img: 'image_listing/10.jpg',
        title: 'Laptop',
    },
    
];

function ImageListing() {
    return (
        <>
            <h1 className='text-center' style={{backgroundColor:'#1976d2',color:'white'}}>Categories</h1>
            <ImageList variant="masonry" className='container' cols={3} gap={8}>
                {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                        <img
                            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            src={`${item.img}?w=248&fit=crop&auto=format`}
                            alt={item.title}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </>
    )
}

export default ImageListing
