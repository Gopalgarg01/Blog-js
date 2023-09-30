import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import {useNavigate} from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Box, Button } from '@mui/material';


export default function BlogCard({title, description, image, username, time, id, isUser}) {
//   const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate();
  const handleDelete= async() => {
    try{
      const{data} = await axios.delete(`/blogs/delete-blog/${id}`);
      if(data?.success){
        alert("Blog delete");
        navigate("/myBlogs");
      }

    }catch(error){
      console.log(error);
    }
    
  };
  
  const handleEdit= () => {
      navigate(`/blog-details/${id}`);    
  };

  return (
    <>
    
    
    <Card sx={{ maxWidth: 345, marginLeft: 5, boxShadow: 3, p:3 , marginTop:3, }}>

    {isUser && (
      <Box display={"flex"} >
      <Button onClick={handleEdit} sx={{ marginLeft:"auto"}}>
      <i class="fa-sharp fa-solid fa-pen"></i>
         </Button>
       <Button onClick={handleDelete}>
        <i class="fa-solid fa-trash"></i>
        </Button>
      
      
      </Box>
    )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            $
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
             {/* <DeleteIcon/> */}
          </IconButton>
        }
        title={username}
        subheader={time}
      >
     
      </CardHeader>
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="Paella dish"
      />
      <CardContent>
      <Typography variant="h4" color="text.primary">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          {/* <FavoriteIcon /> */}
        </IconButton>
        <IconButton aria-label="share">
          {/* <ShareIcon /> */}
        </IconButton>
        {/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore> */}
      </CardActions>
      <Collapse timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    </>
  );
}
